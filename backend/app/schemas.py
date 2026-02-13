from pydantic import BaseModel

class UserCredentials(BaseModel):
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str