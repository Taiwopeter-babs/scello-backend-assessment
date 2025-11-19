
import { normalizeAmount } from "../../utils";
import { IDocumentTextExtractorRuleSet, RuleFields } from "../types";

export const retrieve = {
  name: "fooRule",
  tag: "fooTag",
  ruleGroup: {
   
  },
} as const satisfies IDocumentTextExtractorRuleSet;

type FooType = RuleFields<"fooRule">;

export function fooFunction(text: string): Record<FooType, string | number> {
  const resultObject = {} as Record<FooType, string | number>;
  
  const { ruleGroup } = retrieve;
  
  try {
    const fieldsToRules: Record<FooType, (typeof ruleGroup)[FooType]> = ruleGroup;
    
    for (const [name, regex] of Object.entries(fieldsToRules)) {
      const result = regex.exec(text);
      
      if (!result) throw new Error(`Could not extract ${name} in fooRule RULE`);
      
      const fieldName = name as FooType;
      const fieldResult = result[1] ?? result[0];
      
      resultObject[fieldName] = fieldResult;
    }
    
    return resultObject as Record<FooType, string | number>;
  } catch (error) {
    console.log(error);
    return resultObject;
  }
}
