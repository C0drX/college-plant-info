import qrcode
from PIL import Image, ImageDraw
import sys


# 📥 args
plant_url = sys.argv[1]
output_path = sys.argv[2]
logo_path = sys.argv[3]

# ⚙️ QR setup
qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=20,
    border=2,
)

qr.add_data(plant_url)
qr.make(fit=True)

matrix = qr.get_matrix()

size = len(matrix)
img_size = size * 20

# 🎨 base image
img = Image.new("RGB", (img_size, img_size), "white")
draw = ImageDraw.Draw(img)

# 🌈 gradient colors (deep blue → dark green)
start_color = (10, 25, 80)
end_color = (0, 100, 50)

def get_gradient(y):
    ratio = y / img_size
    r = int(start_color[0] * (1 - ratio) + end_color[0] * ratio)
    g = int(start_color[1] * (1 - ratio) + end_color[1] * ratio)
    b = int(start_color[2] * (1 - ratio) + end_color[2] * ratio)
    return (r, g, b)

# 🖼️ load logo
logo = Image.open(logo_path).convert("RGBA")

logo_size = img_size // 4   # size adjust kar sakta hai
logo = logo.resize((logo_size, logo_size))

center_x = img_size // 2
center_y = img_size // 2

# 🧠 safe zone (logo + padding)
padding = 25

safe_x1 = center_x - logo_size // 2 - padding
safe_y1 = center_y - logo_size // 2 - padding
safe_x2 = center_x + logo_size // 2 + padding
safe_y2 = center_y + logo_size // 2 + padding

# 🔵 draw dotted QR
for y in range(size):
    for x in range(size):

        px = x * 20
        py = y * 20

        # 🚫 skip center safe area
        if safe_x1 < px < safe_x2 and safe_y1 < py < safe_y2:
            continue

        if matrix[y][x]:
            color = get_gradient(py)

            draw.ellipse(
                (
                    px,
                    py,
                    px + 16,
                    py + 16,
                ),
                fill=color,
            )

# 🖼️ paste logo in center
pos = (
    (img_size - logo_size) // 2,
    (img_size - logo_size) // 2,
)

img.paste(logo, pos, mask=logo)

# 💾 save
img.save(output_path)
