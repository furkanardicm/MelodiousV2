const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;
const KNN = require('ml-knn');

app.use(cors()); // cors middleware eklenmiş
app.use(express.static(path.join('/dist/', 'build')));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret', // Oturum bilgilerini şifrelemek için kullanılacak gizli anahtar
  resave: false, // Oturum her istekte yeniden kaydedilmeyecek şekilde ayarlanır
  saveUninitialized: true, // Başlatılmamış oturumları saklamak için
  cookie: { secure: false } // Güvenli olmayan bağlantılara izin ver
}));

// MySQL bağlantı bilgileri
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'melodious2',
});

// MySQL bağlantısını kurma
db.connect((err) => {
  if (err) {
    console.error(err);
  }
  console.log('MySQL Connected');
});
app.post('/log', (req, res) => {
  const { username, password } = req.body;
  console.log("username : ", username, password);
  // Kullanıcı adı ve şifre kontrolü
  const sql = `SELECT * FROM users WHERE username = ?  AND password = ? LIMIT 1`;
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.log(result)
      res.json({ success: false, data: null });
      return result
    }
      

    if (result.length > 0) {
      // Kullanıcı doğrulandı

      req.session.username = username;
      req.session.password = password;
      req.session.isLoggedIn = true;
      res.json({ success: true, data: result });

    } else {
      // Kullanıcı doğrulanamadı
      res.json({ success: false, data: null });
    }
  });
});

app.post('/reg', (req, res) => {
  const { username, password, mail, fullname } = req.body;
  console.log("username : ", username, password, mail, fullname);

  // Kullanıcı adı ve şifre kontrolü
  const sql = `INSERT INTO users (username, password, e_mail, fullname) VALUES (?,?,?,?)`;
  db.query(sql, [username, password, mail, fullname], (err, result, fields) => {
    if (err) { 
      console.error(err);
      res.json({ success: false, data: null });
    } else {
      req.session.username = username;
      req.session.password = password;
      req.session.fullname = fullname;
      req.session.mail = mail;
      req.session.isLoggedIn = true;

      // İkinci sorguyu içeren callback fonksiyonu
      const sql2 = `SELECT * FROM users WHERE user_id = ?`;
      db.query(sql2, [result.insertId], (err2, result2, fields2) => {
        if (err2) {
          console.error(err2);
          res.json({ success: false, data: null });
        } else {
          res.json({ success: true, data: result2 });
        }
      });
    }
  });
});

app.post('/listen', (req, res) => {
  const { id, name, date, predicted_labels } = req.body;
  const sql = `INSERT INTO last_songs (user_id, song_id, date, predicted_labels) VALUES (?,?,?,?)
  ON DUPLICATE KEY UPDATE user_id=?, song_id=?, date=?, predicted_labels=?`;
  db.query(sql, [id, name, date, predicted_labels, id, name, date, predicted_labels], (error, results, fields) => {
    if (error) throw error;
    else{
      res.json({ success: true });
    }
  });
});
// Veritabanındaki tüm şarkıları çek


app.post('/songs', (req, res) => {
  const { user, emotion } = req.body;
  
  const user_id = user[0].user_id;
  
  // En çok tekrar eden predicted_labels değerini bulma
  const mostCommonPredictionSql = `
    SELECT predicted_labels, COUNT(predicted_labels) as cnt
    FROM last_songs
    WHERE user_id = ?
    GROUP BY predicted_labels
    ORDER BY COUNT(*) DESC
    LIMIT 1
  `;

  db.query(mostCommonPredictionSql, [user_id], (error, results, fields) => {
    if (error) {
      res.status(500).json({ success: false, message: "En çok tekrar eden predicted_labels değeri bulunamadı" });
    }
    
    else {
      if (results.length > 0 && results[0].cnt > 4) {
        const mostCommonPrediction = results[0].predicted_labels;
        const cnt = results[0].cnt;
        console.log(mostCommonPrediction, " Most Common Prediction");
        console.log(cnt, " CNT");
        // En çok tekrar eden predicted_labels değerine göre sorgulama yapma
        const recommendationByHistorySql = `
          SELECT *
          FROM tumveriler
          WHERE predicted_labels = ?
          ORDER BY RAND()
          LIMIT 40
        `;
        const recommendationByMoodSql = `
          SELECT *
          FROM tumveriler
          WHERE predicted_labels = ?
          ORDER BY RAND()
          LIMIT 60
        `;
        let myData;
        db.query(recommendationByMoodSql, [emotion], (error, results, fields) => {
          if (error) {
            null
          } else {
            myData = results;
          }
        });

        db.query(recommendationByHistorySql, [mostCommonPrediction], (error, results, fields) => {
          if (error) {
            res.status(500).json({ success: false, message: "Öneri yapılamadı" });
          } else {
            res.json({ success: true, data: results, data2: myData });
          }
        });
      } else {
        // Kullanıcının geçmiş şarkılarının olmadığı durumda random öneri yap
        const randomRecommendationSql = `
          SELECT *
          FROM tumveriler
          WHERE predicted_labels = ?
          ORDER BY RAND()
          LIMIT 100
        `;

        db.query(randomRecommendationSql, [emotion], (error, results, fields) => {
          if (error) {
            res.status(500).json({ success: false, message: "Öneri yapılamadı" });
          } else {
            res.json({ success: true, data: results });
          }
        });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});