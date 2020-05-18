# Firebase Development Mock Upload Server

```
This is a mock server to imitate firebase storage during development, to avoid going online. Just upload a file with a path and it saves the file in the public folder under the path specified. Note that you should try as much as possible to run this on the default port 3000 if you are trying to run any of my firebase projects as most of them expect the server to be running on this port.
```

## Project setup

```
npm install
```

### Start server for development

```
npm run start
```

### Mock Request

```
let uploadToMockServer = async (path, file) => {
    let data = new FormData()
    data.set('path', path)
    data.set('file', file)
    let res = await fetch('http://localhost:3000/file', {
        method: 'POST',
        body: data,
    })
    return res.json()
}
```
