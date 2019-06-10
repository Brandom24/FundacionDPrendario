export class ContadorGrales {

    private static SEQUENCET = 0;
    private static SEQUENCEMAIL = 0;
    private static SEQUENCEDOMI = 0;

    public static nextValT(): number {
        return ContadorGrales.SEQUENCET += 1;
    }

    public static resT(): number {
        return ContadorGrales.SEQUENCET -= 1;
    }

    public static resetT(): void {
        ContadorGrales.SEQUENCET = 0;
    }

    public static nextValE(): number {
        return ContadorGrales.SEQUENCEMAIL += 1;
    }

    public static resE(): number {
        return ContadorGrales.SEQUENCEMAIL -= 1;
    }

    public static resetE(): void {
        ContadorGrales.SEQUENCEMAIL = 0;
    }

    public static nextValD(): number {
        return ContadorGrales.SEQUENCEDOMI += 1;
    }

    public static resD(): number {
        return ContadorGrales.SEQUENCEDOMI -= 1;
    }

    public static resetD(): void {
        ContadorGrales.SEQUENCEDOMI = 0;
    }

}
