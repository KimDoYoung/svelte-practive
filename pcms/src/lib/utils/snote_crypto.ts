import type { SnoteHintPassword, SnoteParse } from '$lib/types/snote';
import { getFetch } from '$lib/api';
import CryptoJS from 'crypto-js';

export class SnoteCrypto {
  private static MAGIC_STRING = 'snote-v1.0';

  /**
   * 서버에서 랜덤 힌트와 해시된 비밀번호를 가져옵니다.
   * @returns 랜덤 힌트와 해시된 비밀번호 객체
   */
  static async fetchRandomHintAndHash() {
    return await getFetch<SnoteHintPassword>('/snote/get-random-hint')
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

    let finalHint: string;
    let passwordHash: string;

    if (password) {
      // 사용자가 비밀번호를 제공한 경우
      finalHint = hint || '사용자 정의 힌트 없음';
      passwordHash = CryptoJS.SHA256(password).toString();
    } else {
      // 비밀번호와 힌트가 없으면 서버에서 가져오기
      const serverData = await this.fetchRandomHintAndHash();
      finalHint = serverData.hint;
      passwordHash = serverData.password;
    }

    // 메시지 암호화
    const encryptedText = CryptoJS.AES.encrypt(message, password!).toString();

    // 포맷팅된 문자열 반환
    return `${this.MAGIC_STRING}[${finalHint}][${passwordHash}][${encryptedText}]`;
  }
  /**
     * 주어진 encryptedNote를 파싱하여 SnoteParse 형태로 반환합니다.
     * @param encryptedNote
     * @returns SnoteParse
     */
  static async parse(encryptedNote: string): Promise<SnoteParse> {
    // MAGIC_STRING 확인
    if (!encryptedNote.startsWith(this.MAGIC_STRING)) {
      throw new Error("Invalid format: Missing MAGIC_STRING prefix");
    }

    // MAGIC_STRING 이후의 부분 추출
    const content = encryptedNote.slice(this.MAGIC_STRING.length);

    // 패턴에 맞는 내용 추출
    const match = content.match(/^\[(.*?)\]\[(.*?)\]\[(.*?)\]$/);

    if (!match || match.length !== 4) {
      throw new Error("Invalid format: Unable to parse the note");
    }

    const [, hint, hashPassword, encryptedText] = match;

    // 결과 반환
    return {
      hint,
      hashPassword,
      encryptedText,
    };
  }
  /**
   * 주어진 SnoteParse를 복호화하여 원본 메시지를 반환합니다.
   * @param snoteParse
   * @param password
   * @returns
   */
  static decrypt(snoteParse: SnoteParse, password: string): string {
    // 비밀번호 해시값 비교
    if (snoteParse.hashPassword !== CryptoJS.SHA256(password).toString()) {
      throw new Error("Invalid password");
    }
    return CryptoJS.AES.decrypt(snoteParse.encryptedText, password).toString(CryptoJS.enc.Utf8);
  }
}
