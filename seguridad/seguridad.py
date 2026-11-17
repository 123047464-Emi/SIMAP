from fastapi import Header, HTTPException,status
from configuracion.setting import settings

def verif_api_key(x_api_key:str=Header(None)):
    if x_api_key!=settings.api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='API KEY invalida'
        )

    return x_api_key
      
