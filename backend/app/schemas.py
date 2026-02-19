from typing import List
from pydantic import BaseModel

class UserCredentials(BaseModel):
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

class Muscle(BaseModel):
    name: str

class ExerciseCreate(BaseModel):
    name: str
    muscle_ids: List[int]