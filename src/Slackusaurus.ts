export class Slackusaurus {

    private findWord(input: string){
        let pattern = new RegExp("(\[\[.+?\]\])");
        let match = input.match(pattern) as Array<string>;

    }
    static async makeSmart(req, res) {
        console.log(req);
        return {sup: 'blah'};
    }
}