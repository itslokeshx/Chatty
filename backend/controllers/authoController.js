import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function login(req, res) {
  const name = req.body.name;
  const user = users.find((u) => u.name === name);
  if (!user) {
    return res.status(404).send("user not found,please register!");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ name: user.name }, SECRET_KEY);

      res.json({
        message: "Login successful",
        token: token,
      });
    } else {
      res.send("wrong password!");
    }
  } catch (error) {}
}

async function register(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json(users);
  } catch (error) {
    res.json({ error: "user creation failed!" });
  }
}

function home(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Status</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .container {
                text-align: center;
                background: white;
                padding: 3rem;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                animation: fadeIn 0.5s ease-in;
            }
            h1 {
                color: #333;
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            .status {
                display: inline-block;
                background: #4CAF50;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 50px;
                font-size: 0.9rem;
                margin-top: 1rem;
            }
            .time {
                color: #666;
                margin-top: 1.5rem;
                font-size: 0.9rem;
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Server is running!</h1>
            <div class="status">● Online</div>
            <div class="time" id="serverTime"></div>
        </div>
        <script>
            function updateTime() {
                const now = new Date();
                document.getElementById('serverTime').innerHTML = 'Server time: ' + now.toLocaleString();
            }
            updateTime();
            setInterval(updateTime, 1000);
        </script>
    </body>
    </html>
  `);
}

function content(req, res) {
  res.send("<h1>THIS CONTENT IS ONLY FOR LOGGED IN USERS!</h1>");
}
export { login, register, home, content };
