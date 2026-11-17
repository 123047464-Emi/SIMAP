#Valida que todas las variables lleguen correctamente
from pydantic import BaseModel
from typing import Dict, Optional


class PredictionRequest(BaseModel):
    #line_id: str
    #machine_id: str
    #machine_type: str
    #timestamp: str
    #circle_result: str
    sensor_data: Dict[str, Optional[float]]