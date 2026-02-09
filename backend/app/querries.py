from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(
    url,
    key
)

def get_all_exercises():
    response = (
        supabase
        .table("exercises")
        .select("*")
        .execute()
    )
    return response.data