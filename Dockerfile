# Use Node.js LTS (Long Term Support) as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your Next.js project
COPY . .

ARG PUBLIC_SUPABASE_URL
ARG SUPABASE_ADMIN_KEY
ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV SUPABASE_ADMIN_KEY=$SUPABASE_ADMIN_KEY

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]