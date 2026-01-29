from fastapi import FastAPI

app = FastAPI(title="Gym API")

@app.get("/")
def read_root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"healthy": True}
