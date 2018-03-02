import * as util from 'util';
// import * as request from 'request';
let request = require('request');
export class Slackusaurus {
    private static findWords(input: string): Array<string> {
        let matches = input.match(/\[[^\]]*\]/g);

        let words: Array<string> = [];

        matches.forEach(word => {
            word = word.replace('[', '');
            word = word.replace(']', '');
            words.push(word);
        })

        return words;
    }

    private static async getSyn(word: string): Promise<string> {
        let synonyms = [];
        const getAsync = util.promisify(request.get);
        try {
            const request = 
                await getAsync({url: 'http://words.bighugelabs.com/api/2/cc6b00dacc0971f09759ac9e1acbf530/' + word + '/json'});
                        
            let body = JSON.parse(request.body);
            Object.keys(body).forEach((pos, index) => {
                let posSyns = body[pos].syn;

                if (posSyns) {
                    synonyms = synonyms.concat(posSyns);
                }
            });
        }
        catch(e) {
            console.log(e);
        }
            
        return synonyms[ Math.floor( Math.random() * synonyms.length ) ];
    }
    static async makeSmart(req, res) {
        let text: string = req.body.text;
        const words = Slackusaurus.findWords(text);
        // const synonyms = await Promise.all(words.map(Slackusaurus.getSyn));
        // console.log(synonyms);
        if ( words && words.length > 0 ){
            for (let word of words) {
                let syn = await Slackusaurus.getSyn(word);
                let searchTerm = '['+word+']';
                text = text.replace(searchTerm, syn);
            }
            return { "response_type": "in_channel",  "text": text};
        }
        else {
            return {"response_type": "ephemeral", "text": 'It already sounds as smart as possible!'}
        }
    }
}