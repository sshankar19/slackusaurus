import * as util from 'util';
import * as request from 'request';
export class Slackusaurus {
    private static findWords(input: string): Array<string> {
        let matches = input.match(/\[[^\]]*\]/g);

        matches.forEach(word => {
            word.replace('[', '');
            word.replace(']', '');
        })

        return matches;
    }

    private static async getSyn(word: string): Promise<string> {
        let synonyms = [];
        const getAsync = util.promisify(request.get);
        try {
            const body = 
                await getAsync({url: 'http://words.bighugelabs.com/api/2/cc6b00dacc0971f09759ac9e1acbf530/' + word + '/json'}, (response) => response.body);
                        
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
        const synonyms = words.map(Slackusaurus.getSyn);
        console.log(synonyms);
        return { sup: synonyms };
    }
}