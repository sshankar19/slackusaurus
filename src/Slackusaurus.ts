export class Slackusaurus{

    private findWord(input: string){
        let pattern = new RegExp("(\[\[.+?\]\])");
        let match = input.match(pattern) as Array<string>;

    }
}