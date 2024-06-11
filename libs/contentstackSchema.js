function contentstackSchema(data){
    Object.keys(data[""]).forEach((key)=>{
        //console.log(key.uid);
        var content_type = {
            title: key.display_name,
            uid:key.uid,
            schema:key.schema,
            options: {
                is_page: true,
                title: "title",
                sub_title: [],
                url_pattern: "/:year/:month/:title",
                _version: 1,
                url_prefix: `/${key.uid}/`,
                description: "",
                singleton: false
            },
            description: ""
        }
        //console.log(content_type);

    })


}
module.exports = contentstackSchema;