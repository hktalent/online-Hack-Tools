module.exports = {
    "tags":"base64",
    "encode":function(a){return Buffer.from(a).toString('base64')},
    "decode":function(a){return Buffer.from(a, 'base64').toString('utf8')}
};