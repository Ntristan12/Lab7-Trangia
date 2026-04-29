import { catchError, of} from 'rxjs';
import { AccountService } from '@app/_services';
export function appInitializer (accountService: AccountService) {
return () => accountService.refresh Token()
.pipe(
// catch error to start app on success or failure
catchError(() => of())
);