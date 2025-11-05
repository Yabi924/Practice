async function checkCookie(cookies: any): Promise<boolean> {
    const { token } = cookies;
    if (!token)
        return false;
    return true;
}