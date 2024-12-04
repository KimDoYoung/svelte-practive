import CryptoJS from 'crypto-js';

export class SnoteCrypto {
  private static MAGIC_STRING = 'snote-v1.0';

  /**
   * 서버에서 랜덤 힌트와 해시된 비밀번호를 가져옵니다.
   * @returns 랜덤 힌트와 해시된 비밀번호 객체
   */
  static async fetchRandomHintAndHash(): Promise<{ hint: string; pwhash: string }> {
    const response = await fetch('http://127.0.0.1:8000/api/get-random-hint');
    if (!response.ok) {
      throw new Error('Failed to fetch hint and password hash from server.');
    }
    return response.json();
  }

  /**
   * 메시지를 암호화합니다. 비밀번호와 힌트가 없으면 서버에서 기본값을 가져옵니다.
   * @param message 암호화할 원본 메시지
   * @param password 암호화에 사용할 비밀번호 (선택적)
   * @param hint 암호 힌트 (선택적)
   * @returns 형식화된 암호화된 문자열
   */
  static async encrypt(
    message: string,
    password?: string,
    hint?: string
  ): Promise<string> {
    if (!message) {
      throw new Error('Message is required for encryption.');
    }

    let finalPassword: string;
    let finalHint: string;
    let passwordHash: string;

    if (password) {
      // 사용자가 비밀번호를 제공한 경우
      finalPassword = password;
      finalHint = hint || '사용자 정의 힌트 없음';
      passwordHash = CryptoJS.SHA256(password).toString();
    } else {
      // 비밀번호와 힌트가 없으면 서버에서 가져오기
      const serverData = await this.fetchRandomHintAndHash();
      finalHint = serverData.hint;
      passwordHash = serverData.pwhash;
      finalPassword = serverData.pwhash; // 해시를 비밀번호로 사용
    }

    // 메시지 암호화
    const encryptedText = CryptoJS.AES.encrypt(message, finalPassword).toString();

    // 포맷팅된 문자열 반환
    return `${this.MAGIC_STRING}[${finalHint}][${passwordHash}][${encryptedText}]`;
  }
}
