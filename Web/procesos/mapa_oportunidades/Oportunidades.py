import pandas as pd
import json
import csv
import sys
import time
import random

def simular_geocoding_api(direccion, ubigeo):
    """
    Simula el uso de Google Maps Geocoding API para obtener coordenadas
    En producción, aquí iría la llamada real a la API de Google
    """
    # Simular delay de API (entre 0.1 y 0.5 segundos)
    time.sleep(random.uniform(0.1, 0.5))
    
    # Simular diferentes tipos de respuestas
    if not direccion or direccion.strip() == "":
        return None, None
    
    # Simular coordenadas basadas en el UBIGEO (para que sean consistentes)
    # En producción, esto sería reemplazado por la llamada real a Google Maps API
    
    # Generar coordenadas consistentes basadas en el UBIGEO
    seed = hash(ubigeo) % 10000
    random.seed(seed)
    
    # Coordenadas aproximadas para Lima, Perú (centro)
    lat_base = -12.0464
    lng_base = -77.0428
    
    # Agregar variación pequeña para simular diferentes ubicaciones
    lat = lat_base + random.uniform(-0.1, 0.1)
    lng = lng_base + random.uniform(-0.1, 0.1)
    
    # Simular algunos casos donde no se encuentra la dirección
    if random.random() < 0.05:  # 5% de probabilidad de no encontrar
        return None, None
    
    return round(lat, 6), round(lng, 6)

def construir_direccion(row):
    """
    Construye la dirección completa uniendo todos los campos de dirección
    """
    campos_direccion = [
        row.get('TIPO DE VÍA', ''),
        row.get('NOMBRE DE VÍA', ''),
        row.get('CÓDIGO DE ZONA', ''),
        row.get('TIPO DE ZONA', ''),
        row.get('NÚMERO', ''),
        row.get('INTERIOR', ''),
        row.get('LOTE', ''),
        row.get('DEPARTAMENTO', ''),
        row.get('MANZANA', ''),
        row.get('KILÓMETRO', '')
    ]
    
    # Filtrar campos que no sean "-" o vacíos
    direccion_partes = []
    for campo in campos_direccion:
        if campo and campo != "-" and str(campo).strip():
            direccion_partes.append(str(campo).strip())
    
    # Unir todas las partes con espacios
    direccion_completa = " ".join(direccion_partes)
    
    return direccion_completa if direccion_completa else ""

def procesar_oportunidades(anexo):
    """
    Procesa el archivo de oportunidades filtrando por anexo específico
    Args:
        anexo (str): Código del anexo a filtrar (ej: '1501')
    """
    print(f"Procesando oportunidades para anexo: {anexo}")
    
    # Leer el archivo TXT con manejo de errores de parsing
    try:
        # Intentar con diferentes encodings y delimitadores
        try:
            # Primero intentar con latin-1 y pipe separators
            df = pd.read_csv("padron_reducido_ruc.txt", sep="|", dtype=str, encoding='latin-1', on_bad_lines='skip')
        except:
            try:
                # Si falla, intentar con cp1252 y pipe separators
                df = pd.read_csv("padron_reducido_ruc.txt", sep="|", dtype=str, encoding='cp1252', on_bad_lines='skip')
            except:
                # Si también falla, intentar con utf-8 y pipe separators
                df = pd.read_csv("padron_reducido_ruc.txt", sep="|", dtype=str, encoding='utf-8', errors='replace', on_bad_lines='skip')
        
        print("Archivo leído exitosamente!")
        print(f"Forma del dataset: {df.shape}")
        print(f"Columnas del dataset: {df.columns.tolist()}")
        
        # Eliminar comillas dobles de todos los valores string
        df = df.applymap(lambda x: x.replace('"', '') if isinstance(x, str) else x)
        
    except Exception as e:
        print(f"Error al leer el archivo: {e}")
        print("Intentando método alternativo...")
        
        # Método alternativo: leer como texto y procesar manualmente
        try:
            with open("padron_reducido_ruc.txt", 'r', encoding='latin-1') as f:
                lines = f.readlines()
            
            print(f"Archivo leído como texto. Total de líneas: {len(lines)}")
            print("Primeras 3 líneas:")
            for i, line in enumerate(lines[:3]):
                print(f"Línea {i+1}: {repr(line[:100])}")
                
        except Exception as e2:
            print(f"Error en método alternativo: {e2}")
            return

    # Filtrar: solo ACTIVO + HABIDO + que no esté vacío el nombre + anexo específico
    if 'ESTADO DEL CONTRIBUYENTE' in df.columns and 'CONDICIÓN DE DOMICILIO' in df.columns and 'NOMBRE DE VÍA' in df.columns and 'UBIGEO' in df.columns:
        
        print(f"Usando columna 'UBIGEO' para filtrar anexo {anexo}")
        
        # Filtrar registros que contengan el anexo en la columna UBIGEO
        df_filtrado = df[
            (df["ESTADO DEL CONTRIBUYENTE"].str.strip().eq("ACTIVO")) &
            (df["CONDICIÓN DE DOMICILIO"].str.strip().eq("HABIDO")) &
            (df["NOMBRE DE VÍA"].notna()) &
            (df["NOMBRE DE VÍA"].str.strip() != "-") &
            (df["UBIGEO"].str.startswith(anexo, na=False))
        ]
        
        # Construir la dirección completa para cada registro
        print("Construyendo direcciones completas...")
        df_filtrado['DIRECCIÓN'] = df_filtrado.apply(construir_direccion, axis=1)
        
        # Simular obtención de coordenadas usando Google Maps Geocoding API
        print("Simulando obtención de coordenadas con Google Maps Geocoding API...")
        latitudes = []
        longitudes = []
        
        total_registros = len(df_filtrado)
        for idx, row in df_filtrado.iterrows():
            direccion = row['DIRECCIÓN']
            ubigeo = row['UBIGEO']
            
            print(f"Procesando {idx+1}/{total_registros}: {direccion[:50]}...")
            
            lat, lng = simular_geocoding_api(direccion, ubigeo)
            latitudes.append(lat)
            longitudes.append(lng)
        
        # Agregar columnas de coordenadas al DataFrame
        df_filtrado['LATITUD'] = latitudes
        df_filtrado['LONGITUD'] = longitudes
        
        # Seleccionar solo las columnas requeridas
        columnas_requeridas = [
            'RUC',
            'NOMBRE O RAZÓN SOCIAL', 
            'ESTADO DEL CONTRIBUYENTE',
            'CONDICIÓN DE DOMICILIO',
            'UBIGEO',
            'DIRECCIÓN',
            'LATITUD',
            'LONGITUD'
        ]
        
        # Verificar qué columnas existen en el dataset
        columnas_existentes = [col for col in columnas_requeridas if col in df_filtrado.columns]
        columnas_faltantes = [col for col in columnas_requeridas if col not in df_filtrado.columns]
        
        if columnas_faltantes:
            print(f"Advertencia: Las siguientes columnas no se encontraron: {columnas_faltantes}")
            print("Columnas disponibles:", df_filtrado.columns.tolist())
        
        # Crear el DataFrame final con las columnas requeridas
        df_final = df_filtrado[columnas_existentes].copy()
        
        # Mostrar resultado
        print(f"\nRegistros filtrados para anexo {anexo}: {len(df_final)} de {len(df)}")
        print("Columnas en el archivo final:", df_final.columns.tolist())
        print(df_final.head())
        
        # Mostrar estadísticas de geocoding
        coordenadas_obtenidas = df_final['LATITUD'].notna().sum()
        print(f"\nEstadísticas de geocoding:")
        print(f"- Coordenadas obtenidas: {coordenadas_obtenidas}/{len(df_final)} ({coordenadas_obtenidas/len(df_final)*100:.1f}%)")
        print(f"- Direcciones sin coordenadas: {len(df_final) - coordenadas_obtenidas}")
        
        # Guardar en CSV con nombre que incluya el anexo
        nombre_archivo = f"activos_habidos_anexo_{anexo}.csv"
        df_final = df_final.applymap(lambda x: x.replace('"', '') if isinstance(x, str) else x)
        df_final.to_csv(nombre_archivo, index=False, encoding="utf-8-sig", quoting=csv.QUOTE_NONE, escapechar='\\')
        print(f"\nArchivo CSV guardado: {nombre_archivo}")
        
        return df_final
    else:
        print("No se encontraron las columnas necesarias en el dataset")
        return None

if __name__ == "__main__":
    # Obtener anexo desde línea de comandos o usar valor por defecto
    if len(sys.argv) > 1:
        anexo = sys.argv[1]
    else:
        anexo = "150131"  # Valor por defecto para la demo
    
    procesar_oportunidades(anexo)
