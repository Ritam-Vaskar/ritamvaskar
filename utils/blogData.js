export const blogPosts = [
  {
    id: 1,
    slug: "building-scalable-react-apps-with-clean-architecture",
    title: "Building Scalable React Apps with Clean Architecture",
    excerpt: "A deep dive into structuring large React applications using clean architecture principles, custom hooks, and modular design patterns.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    author: "Ritam Vaskar",
    date: "April 20, 2026",
    readTime: 8,
    tags: ["React", "Architecture", "JavaScript"],
    content: `
## Introduction

Building a React application is easy. Building a **scalable** React application that can grow with your team and product — that's the real challenge.

In this post, I'll walk through the architecture patterns I use in production applications, drawing from my experience building platforms like **STAYSYNC** and **FAKTCHECK**.

![Architecture Overview](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80)

## The Problem with Default React Structure

Most React apps start with a flat structure:

\`\`\`
src/
├── components/
├── pages/
├── App.js
└── index.js
\`\`\`

This works fine for small projects, but as your app grows, you end up with:
- **200+ components** in a single folder
- **Circular dependencies** between modules
- **God components** that do everything

> [!WARNING]
> If your component file is over 300 lines, it's doing too much.

## Clean Architecture for React

Here's the folder structure I recommend:

\`\`\`bash
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.js
│   ├── dashboard/
│   └── settings/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── constants/
├── core/
│   ├── api/
│   ├── store/
│   └── router/
└── App.js
\`\`\`

### Key Principles

| Principle | Description | Benefit |
|-----------|-------------|---------|
| **Feature-based** | Group by feature, not type | Easy to find related code |
| **Single Responsibility** | Each module does one thing | Easier testing & debugging |
| **Dependency Inversion** | Depend on abstractions | Swappable implementations |
| **Barrel Exports** | Use index.js for public API | Clean import paths |

## Custom Hooks Pattern

One of the most powerful patterns is extracting logic into custom hooks:

\`\`\`javascript
// features/auth/hooks/useAuth.js
import { useState, useCallback } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return { user, loading, error, login, logout };
};
\`\`\`

## Data Flow Architecture

Here's how data flows through a clean React app:

\`\`\`
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   UI Layer  │────▶│  Hook Layer  │────▶│  Service     │
│ (Components)│◀────│  (State +    │◀────│  Layer (API) │
│             │     │   Logic)     │     │              │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │  Store      │
                    │  (Global    │
                    │   State)    │
                    └─────────────┘
\`\`\`

## Performance Considerations

Here are the performance patterns that matter most:

### 1. Code Splitting by Route

\`\`\`javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./features/dashboard'));
const Settings = lazy(() => import('./features/settings'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

### 2. Memoization Strategy

| Technique | When to Use |
|-----------|------------|
| \`React.memo\` | Expensive child components with stable props |
| \`useMemo\` | Expensive computations that depend on specific values |
| \`useCallback\` | Functions passed as props to memoized children |

## Conclusion

Clean architecture isn't about following rules blindly — it's about making your codebase **predictable** and **maintainable**. Start with these patterns and adapt them to your team's needs.

The key takeaway: **organize by feature, not by type**. Your future self will thank you.

---

*Have questions? Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/ritam-vaskar-50627527a).*
    `,
  },
  {
    id: 2,
    slug: "mongodb-aggregation-pipeline-optimization",
    title: "MongoDB Aggregation Pipeline: From Slow to Lightning Fast",
    excerpt: "Learn how to optimize MongoDB aggregation pipelines with indexing strategies, $lookup alternatives, and real-world benchmarks.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    author: "Ritam Vaskar",
    date: "April 15, 2026",
    readTime: 12,
    tags: ["MongoDB", "Database", "Backend"],
    content: `
## Why Aggregation Pipelines Matter

MongoDB's aggregation framework is incredibly powerful, but poorly written pipelines can bring your application to its knees. I learned this the hard way while building **FAKTCHECK**, where quiz result calculations were taking 8+ seconds.

After optimization, the same queries run in under **200ms**. Here's how.

![Database Performance](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80)

## The Bottleneck

Here was our original pipeline:

\`\`\`javascript
db.submissions.aggregate([
  { $match: { contestId: ObjectId("...") } },
  { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
  }},
  { $unwind: "$user" },
  { $group: {
      _id: "$userId",
      totalScore: { $sum: "$score" },
      userName: { $first: "$user.name" }
  }},
  { $sort: { totalScore: -1 } },
  { $limit: 100 }
]);
\`\`\`

### What was wrong?

| Issue | Impact |
|-------|--------|
| No index on \`contestId\` | Full collection scan |
| \`$lookup\` before \`$group\` | Joining all documents unnecessarily |
| No \`$project\` stage | Carrying all fields through pipeline |

## The Optimized Version

\`\`\`javascript
// Step 1: Create compound index
db.submissions.createIndex(
  { contestId: 1, userId: 1, score: 1 }
);

// Step 2: Optimized pipeline
db.submissions.aggregate([
  { $match: { contestId: ObjectId("...") } },
  { $group: {
      _id: "$userId",
      totalScore: { $sum: "$score" },
      submissions: { $sum: 1 }
  }},
  { $sort: { totalScore: -1 } },
  { $limit: 100 },
  { $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user",
      pipeline: [
        { $project: { name: 1, avatar: 1 } }
      ]
  }},
  { $unwind: "$user" },
  { $project: {
      _id: 0,
      userId: "$_id",
      totalScore: 1,
      submissions: 1,
      userName: "$user.name",
      avatar: "$user.avatar"
  }}
]);
\`\`\`

## Benchmark Results

\`\`\`
Before Optimization:
───────────────────────
Documents: 50,000
Avg Response: 8,342ms
Index Used: None (COLLSCAN)

After Optimization:
───────────────────────
Documents: 50,000
Avg Response: 187ms
Index Used: contestId_1_userId_1_score_1
\`\`\`

That's a **44x improvement** 🚀

## Key Takeaways

1. **Always \`$match\` first** — reduce the dataset early
2. **\`$group\` before \`$lookup\`** — join fewer documents
3. **Use \`$project\`** — carry only what you need
4. **Create compound indexes** — cover your query patterns
5. **Use \`explain()\`** — always verify your assumptions

\`\`\`javascript
// Always check your pipeline's execution plan
db.submissions.explain("executionStats").aggregate([...]);
\`\`\`

> [!TIP]
> Use MongoDB Compass to visualize your aggregation pipeline and see which stages are bottlenecks.

---

*This optimization was applied in production on FAKTCHECK, serving 500+ concurrent users during coding contests.*
    `,
  },
  {
    id: 3,
    slug: "deploying-nextjs-with-docker-and-ci-cd",
    title: "Production-Ready Next.js: Docker, CI/CD & Monitoring",
    excerpt: "A complete guide to deploying Next.js applications with Docker containers, GitHub Actions CI/CD, and setting up production monitoring.",
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    author: "Ritam Vaskar",
    date: "April 10, 2026",
    readTime: 15,
    tags: ["Next.js", "Docker", "DevOps", "CI/CD"],
    content: `
## From Development to Production

Most tutorials stop at \`npm run build\`. But deploying a Next.js app to production involves much more — containerization, CI/CD pipelines, environment management, and monitoring.

This guide covers the full journey.

![DevOps Pipeline](https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=700&q=80)

## Step 1: Dockerize Your Next.js App

\`\`\`dockerfile
# Multi-stage build for optimal image size
FROM node:20-alpine AS base

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
\`\`\`

### Image Size Comparison

| Approach | Image Size |
|----------|-----------|
| Basic \`node\` image | ~1.2 GB |
| Alpine base | ~450 MB |
| Multi-stage + standalone | ~120 MB |

## Step 2: Docker Compose for Local Dev

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mongo_data:
\`\`\`

## Step 3: GitHub Actions CI/CD

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t myapp:latest .
      - name: Deploy to server
        run: |
          echo "Deploying to production..."
          # Add your deployment commands here
\`\`\`

## Step 4: Health Checks & Monitoring

Create an API route for health monitoring:

\`\`\`javascript
// app/api/health/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const healthcheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV,
  };

  return NextResponse.json(healthcheck);
}
\`\`\`

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificate active
- [ ] Health check endpoint working
- [ ] Error tracking (Sentry) configured
- [ ] Log aggregation set up
- [ ] CDN configured for static assets
- [ ] Backup strategy in place

> [!IMPORTANT]
> Never commit \`.env\` files. Use your CI/CD platform's secrets management for production environment variables.

## Conclusion

A production deployment is more than just pushing code. It's about building a reliable pipeline that gives you confidence in every release. Start simple, iterate, and add monitoring as your application grows.

---

*This pipeline powers all my production deployments including the FED KIIT website and STAYSYNC.*
    `,
  },
];

export function getBlogBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogById(id) {
  return blogPosts.find((post) => post.id === parseInt(id));
}
