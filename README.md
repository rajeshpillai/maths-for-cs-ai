# Mathematics from First Principles

A structured learning platform for mastering the mathematics behind computer science, game development, and AI/ML.

## Philosophy

Learn math so you can solve it with **paper and pen**. Python is used only to verify your hand-computed answers.

## Structure

```
maths-for-cs/
  frontend/       # SolidJS web app
  backend/        # FastAPI server
  tutorials/      # Markdown lessons organised by tier
    tier-0/       # Number Systems & Arithmetic
    tier-1/       # Discrete Mathematics
    tier-2/       # Linear Algebra
    tier-3/       # Calculus & Analysis
    tier-4/       # Probability & Statistics
    tier-5/       # Optimisation
    tier-6/       # Linear Algebra for Neural Networks
    tier-7/       # Convolutional Neural Networks
    tier-8/       # Geometry & Trigonometry for Game Dev
    tier-9/       # Signals & Fourier Analysis
    tier-10/      # Advanced Topics
```

## Getting Started

### Backend

```bash
cd backend
uv sync
uv run python main.py
```

The API runs at `http://localhost:8000`. Docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Tech Stack

- **Frontend**: SolidJS + TypeScript + Vite
- **Backend**: Python FastAPI
- **Tutorials**: Markdown with LaTeX math notation
