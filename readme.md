# final Labtest2 in year 2-1 -> web Programming I
### NodeJS with Express and MongoDB

resource: https://drive.google.com/drive/folders/1lxA4JUJisLbmVEbXCb33b28BwkJtduyU?usp=sharing

### extension
1. Material Icon Theme

2. indent-rainbow

3. IntelliCode


## First look in NodeJS

1. Run -> npm init (that will Create -> `package.jason`)
   * npm install
   * npm install Express
   * npm install nodemon
   * npm install ejs
   * npm install mongoose
   * npm install multer
   * npm install cookie-parser
   * npm install express-session

3. change some in package.json file
``` bash
"scripts": {
    "start": "nodemon ./bin/www"
},
```

4. Create JS File to run web -> `index.js`
   
So they Can run sever with command `` npm start ``

## ======== MongoDB ==========
MongoDB create folder models to store model for mongoDB

### install mongodb-community
open your terminal and run this 👇🏻

```bash 
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```bash 
brew tap mongodb/brew
```

```bash 
brew update
```

```bash 
brew install mongodb-community
```

run mongodb-community
```bash 
brew services start mongodb/brew/mongodb-community
```



Download Program to manage with GUI -> MongoDB compass
