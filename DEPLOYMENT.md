# Deployment Guide - DisciplineForge

This comprehensive guide covers deploying the DisciplineForge application to various platforms with Vite + Clerk + Convex architecture.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Platform-Specific Deployment](#platform-specific-deployment)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Monitoring and Maintenance](#monitoring-and-maintenance)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Accounts
- **GitHub Account**: For code repository
- **Clerk Account**: For authentication (free tier available)
- **Convex Account**: For database and backend (free tier available)
- **Deployment Platform Account**: Vercel, Netlify, Railway, or Render

### Required Tools
- **Node.js**: Version 18 or higher
- **Git**: For version control
- **Convex CLI**: `npm install -g convex`

---

## 🌍 Environment Setup

### Step 1: Prepare Production Environment Variables

Create a `.env.production` file:

```bash
# Production Environment Variables
VITE_CLERK_PUBLISHABLE_KEY=pk_live_51AbCdEf...
VITE_CONVEX_URL=https://your-production-deployment.convex.cloud
```

### Step 2: Configure Clerk for Production

1. **Switch to Production Mode**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Select your application
   - Go to Settings → General
   - Toggle "Production" mode

2. **Get Production Keys**
   - Go to API Keys section
   - Copy the "Publishable key" (starts with `pk_live_`)
   - Copy the "Secret key" (starts with `sk_live_`)

3. **Configure Allowed Origins**
   - Go to Settings → Domains
   - Add your production domain (e.g., `https://your-app.vercel.app`)
   - Remove development domains if desired

### Step 3: Deploy Convex Backend

```bash
# Deploy to production
npx convex deploy --prod

# Verify deployment
npx convex env list

# Set production secrets
npx convex env set CLERK_SECRET_KEY sk_live_...
```

### Step 4: Update Convex URL

After Convex deployment, update your environment variables with the production URL:

```bash
# Get the production URL from Convex dashboard
# Update VITE_CONVEX_URL in your deployment platform
```

---

## 🚀 Platform-Specific Deployment

### Vercel (Recommended)

#### Option 1: GitHub Integration

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - Go to Project → Settings → Environment Variables
   - Add the following variables:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
     VITE_CONVEX_URL=https://your-deployment.convex.cloud
     ```
   - Set for "Production", "Preview", and "Development"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be available at `https://your-project.vercel.app`

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add VITE_CLERK_PUBLISHABLE_KEY
vercel env add VITE_CONVEX_URL
```

### Netlify

#### Option 1: GitHub Integration

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Base Directory: (leave empty)

3. **Set Environment Variables**
   - Go to Site → Environment Variables
   - Add the following variables:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
     VITE_CONVEX_URL=https://your-deployment.convex.cloud
     ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your app will be available at `https://random-name.netlify.app`

#### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist

# Set environment variables
netlify env:set VITE_CLERK_PUBLISHABLE_KEY pk_live_...
netlify env:set VITE_CONVEX_URL https://your-deployment.convex.cloud
```

### Railway

1. **Connect Repository**
   - Go to [Railway Dashboard](https://railway.app)
   - Click "New Project"
   - Connect your GitHub repository

2. **Configure Service**
   - Railway will auto-detect Vite
   - Build Command: `npm run build`
   - Start Command: `npm run preview`

3. **Set Environment Variables**
   - Go to Variables tab
   - Add the following variables:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
     VITE_CONVEX_URL=https://your-deployment.convex.cloud
     ```

4. **Deploy**
   - Railway will automatically deploy
   - Your app will be available at `https://your-project.railway.app`

### Render

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Environment: Node
   - Build Command: `npm run build`
   - Start Command: `npm run preview`

3. **Set Environment Variables**
   - Go to Environment tab
   - Add the following variables:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
     VITE_CONVEX_URL=https://your-deployment.convex.cloud
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Your app will be available at `https://your-project.onrender.com`

---

## ⚙️ Post-Deployment Configuration

### 1. Update Clerk Allowed Origins

After deployment, update Clerk with your production domain:

1. Go to Clerk Dashboard → Settings → Domains
2. Add your production domain
3. Remove development domains if desired

### 2. Verify Convex Connection

```bash
# Test Convex connection
npx convex run functions/profiles:getMe

# Check environment variables
npx convex env list
```

### 3. Test Authentication Flow

1. Visit your deployed application
2. Try signing up with a new account
3. Verify onboarding flow works
4. Test all major features

### 4. Set Up Custom Domain (Optional)

#### Vercel
1. Go to Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

#### Netlify
1. Go to Site → Domain Management
2. Add custom domain
3. Configure DNS records

#### Railway/Render
1. Go to project settings
2. Add custom domain
3. Configure DNS records

---

## 📊 Monitoring and Maintenance

### 1. Set Up Monitoring

#### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor performance and errors

#### Convex Monitoring
- Use Convex Dashboard for function monitoring
- Set up alerts for errors

#### Clerk Monitoring
- Monitor authentication events in Clerk Dashboard
- Set up webhooks for important events

### 2. Regular Maintenance

#### Weekly Tasks
- Check application uptime
- Review error logs
- Monitor performance metrics

#### Monthly Tasks
- Update dependencies
- Review security settings
- Backup important data

#### Quarterly Tasks
- Rotate API keys
- Review and update environment variables
- Performance optimization

### 3. Backup Strategy

#### Convex Data
- Convex automatically backs up data
- No additional backup needed

#### Environment Variables
- Document all environment variables
- Store securely (password manager)
- Version control configuration files

---

## 🐛 Troubleshooting

### Common Deployment Issues

#### 1. Build Failures

**Symptoms:**
- Build process fails
- Missing environment variables

**Solutions:**
```bash
# Check environment variables
echo $VITE_CLERK_PUBLISHABLE_KEY
echo $VITE_CONVEX_URL

# Test build locally
npm run build

# Check for TypeScript errors
npm run typecheck
```

#### 2. Authentication Not Working

**Symptoms:**
- Users can't sign in
- Clerk errors in console

**Solutions:**
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
- Check allowed origins in Clerk dashboard
- Ensure production keys are used in production

#### 3. Database Connection Issues

**Symptoms:**
- Data not loading
- Convex connection errors

**Solutions:**
- Verify `VITE_CONVEX_URL` is correct
- Check Convex deployment status
- Verify `CLERK_SECRET_KEY` is set in Convex

#### 4. Environment Variables Not Loading

**Symptoms:**
- `undefined` values for environment variables
- Build succeeds but app doesn't work

**Solutions:**
- Ensure variables start with `VITE_`
- Check platform-specific environment variable settings
- Restart deployment after adding variables

### Debug Commands

```bash
# Check build locally
npm run build && npm run preview

# Test Convex connection
npx convex dev --once

# Check environment variables
env | grep VITE_

# Verify Clerk configuration
curl -H "Authorization: Bearer $VITE_CLERK_PUBLISHABLE_KEY" \
  https://api.clerk.com/v1/me
```

### Getting Help

1. **Check Logs**
   - Platform deployment logs
   - Browser console errors
   - Convex function logs

2. **Verify Configuration**
   - All environment variables set
   - Correct API keys used
   - Domains configured properly

3. **Test Incrementally**
   - Deploy with minimal configuration
   - Add features one by one
   - Test each step

---

## 📚 Additional Resources

### Documentation
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Clerk Production Setup](https://clerk.com/docs/deployments/overview)
- [Convex Production Guide](https://docs.convex.dev/production)

### Support
- [Vercel Support](https://vercel.com/support)
- [Netlify Support](https://docs.netlify.com)
- [Clerk Discord](https://discord.gg/b5rXHjAg7A)
- [Convex Discord](https://discord.gg/convex)

---

This deployment guide ensures your DisciplineForge application is deployed successfully and runs smoothly in production.
