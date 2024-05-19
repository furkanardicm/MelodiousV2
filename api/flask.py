from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import base64
from PIL import Image
from io import BytesIO

app = Flask(__name__)
CORS(app)  # Tüm originlere izin verir

# YOLO modelini oluşturun


@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        # Gelen isteği JSON'dan çıkar
        json_data = request.get_json()

        # JSON'dan Base64 veriyi al
        image_data = json_data.get("image", "")

        # Base64 veriyi resme dönüştür
        image_bytes = base64.b64decode(image_data.split(",")[1])
        image = Image.open(BytesIO(image_bytes))
        model = YOLO(
            "C:\\Users\\90552\\Desktop\\Emotion-Detection-using-Face-Recognition-main\\Model 3\\runs\\classify\\train8\\weights\\best.pt"
        )
        # Resmi modelde işle
        results = model.predict(image, show=False)

        # Modelin tahminlerini al
        predicted_emotion = results[0]
        print("Happy: ", predicted_emotion.probs.data[0].item())
        print("Neutral: ", predicted_emotion.probs.data[1].item())
        print("Sad: ", predicted_emotion.probs.data[2].item())
        return (
            jsonify(
                {
                    "Happy": round(predicted_emotion.probs.data[0].item(), 3),
                    "Neutral": round(predicted_emotion.probs.data[1].item(), 3),
                    "Sad": round(predicted_emotion.probs.data[2].item(), 3),
                }
            ),
            200,
        )


if __name__ == "__main__":
    app.run(debug=True, port=5000)
