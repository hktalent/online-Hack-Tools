module.exports = {
    "tags":"hex",
    "encode":function(a){return Buffer.from(a).toString('hex')},
    "decode":function(a){return Buffer.from(a, 'hex').toString('utf8')}
};