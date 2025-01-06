# Use the official Python image as the base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy the Django project files to the container
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Copy your custom nginx.conf (create this file in the backend folder)
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose necessary ports
EXPOSE 8000 80

# Command to run both Gunicorn (Django) and Nginx
CMD service nginx start && gunicorn  backend.backend.wsgi:application --bind 0.0.0.0:8000
