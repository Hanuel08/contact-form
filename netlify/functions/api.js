import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const fileUrl = fileURLToPath(import.meta.url)
const fileDir = dirname(fileUrl)

const DB_PATH = join(fileDir, "db.json")

let data = null

function loadDB() {
  if (!data) {
    const raw = readFileSync(DB_PATH, "utf-8")
    data = JSON.parse(raw)
  }
  return data
}

function parseBody(body) {
  if (!body) return null
  try {
    return JSON.parse(body)
  } catch {
    return null
  }
}

function extractId(pathname) {
  const match = pathname.match(/\/api\/users\/(.+)/)
  return match ? match[1] : null
}

export default async function handler(req) {
  const { method } = req
  const url = new URL(req.url)
  const pathname = url.pathname
  const id = extractId(pathname)

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  }

  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers })
  }

  const db = loadDB()

  try {
    if (pathname === "/api/users" && method === "GET") {
      return new Response(JSON.stringify(db.users), { status: 200, headers })
    }

    if (pathname === "/api/users" && method === "POST") {
      const body = parseBody(await req.text())
      if (!body) {
        return new Response(JSON.stringify({ error: "Invalid body" }), { status: 400, headers })
      }
      const newUser = { ...body }
      if (!newUser.id) newUser.id = crypto.randomUUID()
      db.users.push(newUser)
      return new Response(JSON.stringify(newUser), { status: 201, headers })
    }

    if (id && method === "GET") {
      const user = db.users.find(u => u.id === id)
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404, headers })
      }
      return new Response(JSON.stringify(user), { status: 200, headers })
    }

    if (id && method === "PUT") {
      const body = parseBody(await req.text())
      if (!body) {
        return new Response(JSON.stringify({ error: "Invalid body" }), { status: 400, headers })
      }
      const index = db.users.findIndex(u => u.id === id)
      if (index === -1) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404, headers })
      }
      db.users[index] = { ...db.users[index], ...body }
      return new Response(JSON.stringify(db.users[index]), { status: 200, headers })
    }

    if (id && method === "DELETE") {
      const index = db.users.findIndex(u => u.id === id)
      if (index === -1) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404, headers })
      }
      const deleted = db.users.splice(index, 1)[0]
      return new Response(JSON.stringify(deleted), { status: 200, headers })
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers })
  }
}

export const config = {
  path: "/api/*"
}
