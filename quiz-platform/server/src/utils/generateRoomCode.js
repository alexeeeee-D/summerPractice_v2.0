export default function generateRoomCode() {

    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        code += symbols.charAt(
            Math.floor(Math.random() * symbols.length)
        );

    }

    return code;

}