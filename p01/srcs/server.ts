function loop(t: number, m: number)
{
    if (m > t)
        return ;
    console.log(m);
    setTimeout(() => {
        loop(t, m + 1);
    }, 1000 * 1);
}

function main()
{
    loop(100, 0);
}

main();