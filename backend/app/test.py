from app.utils import readDataFromCSV

def generateTestData():

    features = [
        'Mileage',
        'Engine Size',
    ]

    label = 'Price'

    csv = 'Car_Price_Prediction.csv'

    x, y = readDataFromCSV(csv, features, label)

    return x, y, features, label