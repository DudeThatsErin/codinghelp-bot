module.exports = {
    name: 'vla',
    description: 'Sends info on what a VLA is and why is it bad?',
    usage: `/vla`,
    execute(interaction) {
        interaction.reply({ content: `**What is a VLA? Why is it bad?**\nA **VLA** stands for variable length array which is an array where teh size is not constant and depends on a variable.\n\nVLAs have poor compiler support and can lead to inefficient code. The core issue with VLAs is that the compiler doesn't know the size of the stack frame. Without warning flags like \`-WVLA\` (turned on by \`-Wall\`)it can be easy to create a VLA by accident, even in C++ with some compilers.\n\nCompiler Support:\n✅ available since C99\n⛔ not available in C++ at all\n⛔ was never supported by MSVC\n⚠️ optional feature since C11\n⚠️ supported as non-standard extension by GCC, clang.` });
    }
}