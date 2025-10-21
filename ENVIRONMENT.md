# Environment Variables Configuration - DisciplineForge

This document provides comprehensive guidance on configuring environment variables for the DisciplineForge application across different environments.

## 📋 Table of Contents

1. [Required Environment Variables](#required-environment-variables)
2. [Development Setup](#development-setup)
3. [Production Deployment](#production-deployment)
4. [Platform-Specific Configuration](#platform-specific-configuration)
5. [Security Best Practices](#security-best-practices)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Required Environment Variables

### Client-Side Variables (Vite)

These variables are exposed to the browser and should be prefixed with `VITE_`:

```bash
# Clerk Authentication (Client-side)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_... # Development
VITE_CLERK_PUBLISHABLE_KEY=pk_live_... # Production

# Convex Database URL
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

### Server-Side Variables (Convex Dashboard)

These variables are used by Convex functions and should be set in the Convex dashboard:

```bash
# Clerk Authentication (Server-side)
CLERK_SECRET_KEY=sk_test_... # Development
CLERK_SECRET_KEY=sk_live_... # Production
```

---

## 🚀 Development Setup

### Step 1: Create Environment File

```bash
# Copy the example file
cp .env.example .env.local

# Edit the file with your values
nano .env.local
```

### Step 2: Configure Clerk

1. **Create Clerk Account**
   - Go to [clerk.com](https://clerk.com)
   - Sign up for a free account
   - Create a new application

2. **Get API Keys**
   - In Clerk Dashboard → API Keys
   - Copy the "Publishable key" (starts with `pk_test_`)
   - Copy the "Secret key" (starts with `sk_test_`)

3. **Configure Allowed Origins**
   - In Clerk Dashboard → Settings → Domains
   - Add `http://localhost:5173` for development
   - Add your production domain for deployment

### Step 3: Configure Convex

1. **Create Convex Account**
   - Go to [convex.dev](https://convex.dev)
   - Sign up for a free account
   - Create a new project

2. **Link Project**
   ```bash
   npx convex dev
   # Follow prompts to link your project
   ```

3. **Set Server-Side Secrets**
   - In Convex Dashboard → Settings → Environment Variables
   - Add `CLERK_SECRET_KEY` with your Clerk secret key

### Step 4: Complete Environment File

Your `.env.local` should look like:

```bash
# Clerk Authentication (Client-side)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_51AbCdEf...

# Convex Database URL
VITE_CONVEX_URL=https://your-project-name.convex.cloud
```

---

## 🌐 Production Deployment

### Environment Variables for Production

Create a `.env.production` file or set environment variables in your deployment platform:

```bash
# Production Environment Variables
VITE_CLERK_PUBLISHABLE_KEY=pk_live_51AbCdEf...
VITE_CONVEX_URL=https://your-production-deployment.convex.cloud
```

### Clerk Production Setup

1. **Switch to Production**
   - In Clerk Dashboard → Settings → General
   - Toggle "Production" mode
   - Copy the production publishable key

2. **Configure Production Domains**
   - Add your production domain (e.g., `https://your-app.vercel.app`)
   - Remove development domains if desired

3. **Update Convex Secrets**
   - In Convex Dashboard → Settings → Environment Variables
   - Update `CLERK_SECRET_KEY` with production secret key

### Convex Production Deployment

```bash
# Deploy Convex functions to production
npx convex deploy --prod

# Verify deployment
npx convex env list
```

---

## 🏗️ Platform-Specific Configuration

### Vercel Deployment

1. **Connect Repository**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Vite configuration

2. **Set Environment Variables**
   - In Vercel Dashboard → Project → Settings → Environment Variables
   - Add all `VITE_` prefixed variables
   - Set for "Production", "Preview", and "Development" environments

3. **Build Configuration**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Netlify Deployment

1. **Connect Repository**
   - Connect your GitHub repository to Netlify
   - Configure build settings

2. **Set Environment Variables**
   - In Netlify Dashboard → Site → Environment Variables
   - Add all `VITE_` prefixed variables

3. **Build Configuration**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Railway/Render Deployment

1. **Connect Repository**
   - Connect your GitHub repository
   - Configure build settings

2. **Set Environment Variables**
   - In platform dashboard → Environment Variables
   - Add all `VITE_` prefixed variables

3. **Build Configuration**
   - Build Command: `npm run build`
   - Start Command: `npm run preview`

---

## 🔒 Security Best Practices

### Environment Variable Security

1. **Never Commit Secrets**
   ```bash
   # Add to .gitignore
   .env.local
   .env.production
   .env.*.local
   ```

2. **Use Different Keys for Different Environments**
   - Development: `pk_test_` and `sk_test_`
   - Production: `pk_live_` and `sk_live_`

3. **Rotate Keys Regularly**
   - Generate new keys in Clerk dashboard
   - Update all environments
   - Test thoroughly after rotation

4. **Limit Key Permissions**
   - Use least-privilege principle
   - Only grant necessary permissions

### Clerk Security Configuration

1. **Configure JWT Templates**
   - Set appropriate token expiration times
   - Configure custom claims if needed

2. **Set Up Webhooks**
   - Configure webhooks for user events
   - Verify webhook signatures

3. **Enable Rate Limiting**
   - Configure rate limits for API endpoints
   - Monitor for abuse

### Convex Security

1. **Row-Level Security**
   - All queries are automatically scoped to authenticated users
   - No additional configuration needed

2. **Function Security**
   - All functions verify authentication
   - Use `ctx.auth.getUserIdentity()` for user verification

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading

**Symptoms:**
- `undefined` values for environment variables
- Build errors related to missing variables

**Solutions:**
```bash
# Check if file exists
ls -la .env.local

# Verify variable names (must start with VITE_)
grep VITE_ .env.local

# Restart development server
npm run dev
```

#### 2. Clerk Authentication Errors

**Symptoms:**
- "Invalid publishable key" errors
- Authentication not working

**Solutions:**
```bash
# Verify key format
echo $VITE_CLERK_PUBLISHABLE_KEY
# Should start with pk_test_ or pk_live_

# Check allowed origins in Clerk dashboard
# Ensure localhost:5173 is added for development
```

#### 3. Convex Connection Issues

**Symptoms:**
- "Invalid Convex URL" errors
- Database queries failing

**Solutions:**
```bash
# Verify Convex URL format
echo $VITE_CONVEX_URL
# Should be https://your-deployment.convex.cloud

# Check Convex status
npx convex dev --once

# Verify secrets are set
npx convex env list
```

#### 4. Build Failures

**Symptoms:**
- Build process fails
- Missing environment variables in build

**Solutions:**
```bash
# Check for missing variables
npm run build 2>&1 | grep -i "undefined"

# Verify all VITE_ variables are set
env | grep VITE_

# Clear cache and rebuild
rm -rf node_modules/.vite
npm run build
```

### Debug Commands

```bash
# Check environment variables
env | grep VITE_

# Verify Convex connection
npx convex dev --once

# Check Clerk configuration
curl -H "Authorization: Bearer $VITE_CLERK_PUBLISHABLE_KEY" \
  https://api.clerk.com/v1/me

# Test build locally
npm run build && npm run preview
```

### Getting Help

1. **Check Logs**
   - Browser console for client-side errors
   - Convex dashboard for server-side errors
   - Deployment platform logs

2. **Verify Configuration**
   - Double-check all environment variables
   - Ensure correct key formats
   - Verify domain configurations

3. **Test Incrementally**
   - Test with minimal configuration
   - Add variables one by one
   - Verify each step works

---

## 📚 Additional Resources

### Documentation Links
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Clerk Environment Setup](https://clerk.com/docs/quickstarts/nextjs)
- [Convex Environment Variables](https://docs.convex.dev/production/environment-variables)

### Support Channels
- [Clerk Discord](https://discord.gg/b5rXHjAg7A)
- [Convex Discord](https://discord.gg/convex)
- [Vite GitHub Discussions](https://github.com/vitejs/vite/discussions)

---

This environment configuration guide ensures your DisciplineForge application runs securely and efficiently across all environments.
