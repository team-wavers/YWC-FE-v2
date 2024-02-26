import styled from "styled-components";

const highlightKeyword = (text: string, keyword: string) => {
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    if (keyword === "" || !text.includes(keyword)) return text;
    return (
        <>
            {parts.map((part, i) => {
                if (part === keyword) {
                    return <Highlighter key={i}>{part}</Highlighter>;
                } else {
                    return part;
                }
            })}
        </>
    );
};

const Highlighter = styled.span`
    font-size: inherit;
    color: ${({ theme }) => theme.primary};
`;

export { highlightKeyword };
