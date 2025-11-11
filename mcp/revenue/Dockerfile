FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    PATH="/opt/venv/bin:$PATH"

WORKDIR /app

# Create an isolated virtual environment for the service runtime.
RUN python -m venv /opt/venv \
    && pip install --upgrade pip

# Create a non-root user early so we can copy files directly with the right owner.
RUN groupadd --system revenue && useradd --system --gid revenue revenue

# Install Python dependencies separately to leverage Docker layer caching.
COPY requirements.txt .
RUN pip install -r requirements.txt


# Copy the rest of the application code.
COPY --chown=revenue:revenue . .

USER revenue

EXPOSE 8080

CMD ["python", "main.py"]
