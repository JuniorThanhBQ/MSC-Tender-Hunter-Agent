import secrets
import string

safe_specials = "!$&()*+,-.=[]_{}~"
all_chars = (
    string.ascii_uppercase + string.ascii_lowercase + string.digits + safe_specials
)

while True:
    pwd = "".join(secrets.choice(all_chars) for _ in range(32))
    if (
        any(c.isupper() for c in pwd)
        and any(c.islower() for c in pwd)
        and any(c.isdigit() for c in pwd)
        and any(c in safe_specials for c in pwd)
    ):
        print(pwd)
    break
