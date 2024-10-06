import re


def check_substring(sub_string, is_rare):

    value = -1
    if not sub_string:
        return value

    check_list = [('1', 'one'), ('2', 'two'), ('3', 'three'), ('4', 'four'),
                  ('5', 'five'), ('6', 'six'), ('7', 'seven'), ('8', 'eight'), ('9', 'nine')]

    if (is_rare):
        index = -1
    else:
        index = len(sub_string)

    for (key, number) in check_list:
        if re.search(number, sub_string):
            if (is_rare):
                if (sub_string.rindex(number) > index):
                    index = sub_string.rindex(number)
                    value = key
            else:
                if (sub_string.index(number) < index):
                    index = sub_string.index(number)
                    value = key

    return value


def get_value(string_name):
    first = "0"
    second = "0"

    for element in string_name:
        if (element.isdigit()):
            first = check_substring(
                string_name[:string_name.index(element)], False)
            if (first == -1):
                first = element
            break
        if element == string_name[-1]:
            first = check_substring(string_name, False)
            if (first == -1):
                first = element

    for element in reversed(string_name):
        if (element.isdigit()):
            second = check_substring(
                string_name[string_name.rindex(element)+1:], True)
            if (second == -1):
                second = element
            break

        if element == string_name[0]:
            second = check_substring(string_name, True)
            if (second == -1):
                second = element

    return int(first + second)


sum_of_all = 0
file_name = "input.txt"
file1 = open(file_name, 'r')
count = 0

while True:

    line = file1.readline()

    if not line:
        break

    count += 1
    extracted = get_value(line)
    print(f"{extracted} <- {line}")
    sum_of_all += extracted

print(f"Extracted : {count}")
print(f"Sum of all values : {sum_of_all}")
