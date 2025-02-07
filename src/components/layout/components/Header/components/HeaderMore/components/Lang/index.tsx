export const Lang = () => {
    const langs: {key: string, icon: any}[] = [
        {
            key: 'vi',
            icon: '/lang/vietnam.png',
        }
    ]
    return (<div className="flex pl-4 pr-5 cursor-pointer">
        <img className="h-[32px] w-[32px]" src={langs[0].icon} />
    </div>)
}