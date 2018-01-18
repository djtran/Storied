# Server-side sources

Directly opposed to '/public', '/private' should be used for server-side logic and routing. Things like database object models, route controllers, etc. should live here.

## Potential sources

### /private/model/
Models for DB objects. For now, we'll need/plan for:  
- User
- BigPicture
- LittlePicture

I'm imagining at that LittlePictures are optional, and if they exist they will only contain details that should be well defined such as searchable "tags", etc.

### /private/controllers
Route endpoints would delegate the work to a controller, which will interact with the data & db according to the model structures defined in '/private/model'



