import os
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = "postgresql://admin:root@postgres:5432/gym"

def get_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn
