from .models import Questions
from .utils.utils import get_type_and_weightage
from .generate_doc import convert_to_doc
import random


def generate_test_paper(subject,chapters,subject_breakup):
    test_paper_dict=[]
    save_list=[]
    ''' here chapters should be in form of list=['Sun','Gravitation']

    here subject_breakup will be of form{
        '1A': [5, 5],
        '1B': [5, 5],
        '2': [7, 5],
        '3': [7, 5],
        '5': [2, 2]
    }

    '''

    for question_type in subject_breakup:
        final_list=[]
        total_question_no=subject_breakup.get(question_type,None)[0]
        type,weightage=get_type_and_weightage(question_type)
        total_list=Questions.objects.filter(question_type=type,subject=subject,
        question_weightage=weightage,chapter__in=chapters).values_list('text',flat=True)
        list1=[]
        for i in range(len(total_list)):
            list1.append(i)
        random_no=random.sample(list1,total_question_no)
        for i in random_no:
            question=total_list[i]
            final_list.append(question)
        row={
            'question_type':question_type,
            'question':final_list,
            'attempt':subject_breakup.get(question_type,None)[1]
         }
        test_paper_dict.append(row)    
    convert_to_doc(test_paper_dict)
    return test_paper_dict