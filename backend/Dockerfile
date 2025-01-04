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

# Copy the Django project files to the container
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the default Django port
EXPOSE 8000

# Command to run the Django app
CMD ["gunicorn", "mus.wsgi:application", "--bind", "0.0.0.0:8000"]