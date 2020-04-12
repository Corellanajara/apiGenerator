module.exports = {
    "port": 8080,
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "vase!!erpvase",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    }
};
