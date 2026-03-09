ARG node_ver=20-alpine
FROM node:${node_ver} AS build-stage

RUN addgroup -g 1001 -S digital-group && adduser -S digital -u 1001
USER digital:digital-group

# Set the working directory for the build stage
WORKDIR /app

# Copy your application dependencies to the container (this is a separate step to take advantage of cached Docker layers)
COPY package*.json ./

# Install dependencies using npm or yarn (use one or the other)
RUN npm ci

# Copy your application source code with proper ownership
COPY --chown=digital:digital-group . .

ARG AZURE_CLIENT_ID
ARG AZURE_REDIRECT_URI
ARG AZURE_TENANT_ID
ARG AZURE_SCOPES
ARG SERVER_BASE_URL

ENV VITE_AZURE_CLIENT_ID=$AZURE_CLIENT_ID
ENV VITE_AZURE_REDIRECT_URI=$AZURE_REDIRECT_URI
ENV VITE_AZURE_TENANT_ID=$AZURE_TENANT_ID
ENV VITE_AZURE_SCOPES=$AZURE_SCOPES
ENV VITE_SERVER_BASE_URL=$SERVER_BASE_URL
ENV GENERATE_SOURCEMAP=false

# Set the environment variables for the build stage
ENV NODE_ENV=production

# Build the Vite application
RUN npm run build

# Production stage
FROM nginx:alpine AS production-stage

WORKDIR /usr/share/nginx/html

# copy from the build folder of the build stage
COPY --from=build-stage /app/dist .
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]