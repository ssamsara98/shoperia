// import { User } from './models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: {} | null;
    }
    namespace Multer {
      interface File {
        key: string;
      }
    }
  }
}
