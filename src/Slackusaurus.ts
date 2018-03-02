import * as util from 'util';
// import * as request from 'request';
let request = require('request');
export class Slackusaurus {
    private static findWords(input: string): Array<String> {
        let matches = input.match(/\[[^\]]*\]/g);

        let words: Array<String> = [];

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
        const text = req.body.text;
        const words = Slackusaurus.findWords(text);
        const synonyms = await Promise.all(words.map(Slackusaurus.getSyn));
        console.log(synonyms);
        return { sup: synonyms };
    }
}