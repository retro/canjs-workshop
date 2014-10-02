steal('apitizer', 'faker', function(apitizer, faker){

	var MessageSchema = {
		type : "object",
		properties : {
			id : {
				type : "integer"
			},
			from : {
				type : "string",
				format : 'email'
			},
			to : {
				type : "string",
				format : 'email'
			},
			subject : {
				type : "string"
			},
			body : {
				type : "string"
			},
			avatar : {
				typs : "string"
			},
			isImportant : {
				type : "boolean"
			}
		}
	};

	apitizer.fixture.delay(200, 500); // delay will be between 200 and 500 milliseconds
	apitizer.addSchema('message', MessageSchema);

	var rand = apitizer.types.integer({
		minimum : 0,
		maximum : 1
	});

	var messageStore = apitizer.schemaStore('message', 100, {
		id : apitizer.types.autoincrement(),
		to : function(){
			return "user@canjs-workshop.com"
		},
		subject : function(){
			return faker.lorem.sentence();
		},
		body : function(){
			return faker.lorem.paragraph();
		},
		isImportant : function(){
			return rand.generate() === 1
		},
		avatar : function(){
			return faker.image.avatar();
		}
	});

	apitizer.fixture.resource('/messages', messageStore);
})