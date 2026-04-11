FROM node:18

# 👇 minimal Python install
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 👇 Python deps
COPY requirements.txt .
RUN pip3 install --break-system-packages --no-cache-dir -r requirements.txt

# 👇 Node deps
COPY package*.json ./
RUN npm install

# 👇 code
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]