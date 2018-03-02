export class Slackusaurus {

    private findWord(input: string): Array<string>{
        let pattern = new RegExp("(\[\[.+?\]\])");
        let matches = input.match(pattern) as Array<string>;
        matches.forEach(word=> {
            word.replace('[', '');
            word.replace(']', '');
        })

        return matches;
    }

    private getSyn(word: string): string{
        let request = require('request');
        let syns = [];
        request.get('http://words.bighugelabs.com/api/2/cc6b00dacc0971f09759ac9e1acbf530/'+ word + '/')
        .on('response', function(response) {
            Object.keys(response).forEach((key,index) => {
                if(response[key].syn){
                    syns = syns.concat(response[key].syn);
                }
            });
        });
        return syns[Math.floor(Math.random()*syns.length)];
    }
    static async makeSmart(blah, blah2) {
        return {lol: 'sup'};
    }
}